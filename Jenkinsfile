pipeline {
  agent { label 'Linux Server Agent' }
   environment {
        encryptionKey = credentials('015cfb99-c1e5-4a9e-a58e-1ce55356a41b')
    }
  stages {
    stage('Checkout Scm') {
      steps {
        git(
          credentialsId: 'c8ab18b2-cb89-471b-9c1b-3baa6b060eff', 
          url: 'https://github.com/AllanLogedi/eac_disease_surveillance.git',
          branch: 'main'
        )
      }
    }

stage('TRANSFER TO THE SERVER') {
            steps {
                sh '''#!/bin/bash
                ##### TRANSFER TO THE SERVER ###############
                sudo rm -rf /var/www/eac_disease_surveillance
                sudo mkdir /var/www/eac_disease_surveillance
                sudo cp -R * /var/www/eac_disease_surveillance
                sudo chown -R jenkins /var/www/eac_disease_surveillance
                sudo chgrp -R www-data /var/www/eac_disease_surveillance
                '''
            }
        }

        stage('Run in Parallel') {
            parallel {
                stage('PRODUCTION OF LARAVEL SIDE') {
                    steps {
                        sh '''#!/bin/bash
                        ###### PRODUCTION OF LARAVEL SIDE ####################
                        cd /var/www/eac_disease_surveillance/development/surveillance_app
                        composer install --prefer-dist --no-dev -o

                        # Decrypt the .env file using the encryption key
                        php artisan env:decrypt --key=$encryptionKey

                        sed -i \'2s/local/production/\' .env
                        sed -i \'4s/true/false/\' .env
                        sed -i \'34s/false/true/\' .env
                        php artisan optimize
                        rm .env.encrypted
                        
                        # Enable Maintenance Mode
                        php artisan down

                        # Disable Maintenance Mode
                        php artisan up

                        # Adjust permissions
                        chmod -R 775 /var/www/eac_disease_surveillance/development/surveillance_app/storage
                        chmod -R 775 /var/www/eac_disease_surveillance/development/surveillance_app/bootstrap
                        '''
                    }
                }

                stage('PRODUCTION OF ANGULAR SIDE') {
                    steps {
                        sh '''#!/bin/bash
                        ###### PRODUCTION OF ANGULAR SIDE ####################
                        cd /var/www/eac_disease_surveillance/development/surveillance_app/public/views/dev_portal/comesa-sws/src/app
                        npm install --legacy-peer-deps
                        sed -i \'1s/development/production/\' app-settings.ts
                        cd ../../

                        # Run the ng build command and capture its output
                        build_output=$(ng build)
                        echo "$build_output"

                        # Path to the init.blade.php file
                        init_file="/var/www/eac_disease_surveillance/development/surveillance_app/public/init.blade.php"

                        # Function to update filenames in init.blade.php
                        update_filenames() {
                            pattern="$1"
                            build_output="$2"
                            init_file="$3"
                            line_number="$4"

                        # Extract the filename from the build output
                        new_file=$(echo "$build_output" | grep -o "$pattern")

                         # If a new file is found, update the init.blade.php file
                        if [ -n "$new_file" ]; then
                        # Update the specific line in the init.blade.php file with the new filename
                        sed -i "${line_number}s|$pattern|$new_file|g" "$init_file"
                        fi
                        }

                        # Update initial chunk files at their respective line numbers
                        update_filenames "styles\\-[A-Z0-9]*\\.css" "$build_output" "$init_file" 18
                        update_filenames "polyfills\\-[A-Z0-9]*\\.js" "$build_output" "$init_file" 53
                        update_filenames "scripts\\-[A-Z0-9]*\\.js" "$build_output" "$init_file" 54
                        update_filenames "main\\-[A-Z0-9]*\\.js" "$build_output" "$init_file" 55

                        # Extract lazy chunk files from the build output
                        lazy_chunk_files=$(echo "$build_output" | grep -o \'chunk\\-[A-Z0-9]*\\.js\')

                        # Temporary file to store the modified content of init.blade.php
                        temp_file=$(mktemp)

                        # Read the init.blade.php file line by line
                        while IFS= read -r line; do
                            if echo "$line" | grep -q \'<script type="module" src="{{asset(\'views/front-end/chunk\\-[A-Z0-9]*\\.js\')}}"></script>\'; then
                            # Extract the file name of the current line
                            current_base_name=$(echo "$line" | grep -o \'chunk\\-[A-Z0-9]*\\.js\')

                            # Check if the file name exists in the new lazy chunk files
                            found=false
                            for lazy_chunk in $lazy_chunk_files; do
                                if echo "$lazy_chunk" | grep -q "^$current_base_name"; then
                                # Replace the current line with the new lazy chunk filename
                                new_line=$(echo "$line" | sed "s|chunk\\-[A-Z0-9]*\\.js|$lazy_chunk|g")
                                echo "$new_line" >> "$temp_file"
                                lazy_chunk_files=$(echo "$lazy_chunk_files" | grep -v "$lazy_chunk")
                                found=true
                                break
                                fi
                            done

                            # If the base name was not found, keep the original line
                            if [ "$found" = false ]; then
                                echo "$line" >> "$temp_file"
                            fi
                            else
                            echo "$line" >> "$temp_file"
                            fi
                        done < "$init_file"

                        # Add any remaining new lazy chunk files
                        for lazy_chunk in $lazy_chunk_files; do
                            echo "<script type=\\"module\\" src=\\"{{asset(\'views/front-end/$lazy_chunk\')}}\\"></script>" >> "$temp_file"
                        done

                        echo "</html>" >> "$temp_file"
                        # Move the temporary file to replace the original init.blade.php file
                        mv "$temp_file" "$init_file"
                        # Adjust permissions
                        chmod 755 "$init_file"

                        # Copy generated lazy chunk files to the public folder
                        cp /var/www/eac_disease_surveillance/development/surveillance_app/public/views/front-end/*.js /var/www/eac_disease_surveillance/development/surveillance_app/public/

                        # Copy asset files
                        cp -R /var/www/eac_disease_surveillance/development/surveillance_app/public/views/front-end/assets /var/www/eac_disease_surveillance/development/surveillance_app/public/

                        ## DELETE EXTRA FILES #####
                        cd /var/www/eac_disease_surveillance/development/surveillance_app/public/views/
                        rm -rf dev_portal
                        cd /var/www/eac_disease_surveillance
                        find /var/www/eac_disease_surveillance -mindepth 1 -maxdepth 1 ! -name "developmentv2" -exec rm -rf {} +

                        ## NOT NEEDED FOR COMESA
                        # find /var/www/jenkins_test/ppm_solutions_v2 -mindepth 1 -maxdepth 1 ! -name "development" -exec rm -rf {} +

                        #Reload Apache2 to apply changes
                        sudo systemctl reload apache2

                        echo "Deployment Successful"
                        '''
                    }
                }
            }
        }
    }
    post {
         changed {
            script {
                if (currentBuild.currentResult == 'FAILURE') { 
                    emailext subject: '$DEFAULT_SUBJECT',
                        body: '$DEFAULT_CONTENT',
                        recipientProviders: [
                            [$class: 'CulpritsRecipientProvider'],
                            [$class: 'DevelopersRecipientProvider'],
                            [$class: 'RequesterRecipientProvider'] 
                        ], 
                        replyTo: '$DEFAULT_REPLYTO',
                        to: '$DEFAULT_RECIPIENTS'
                }
            }
        }
    }
  }
