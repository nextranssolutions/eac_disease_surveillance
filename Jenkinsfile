pipeline {
  agent { label 'Linux Server Agent' }
   environment {
        encryptionKey = credentials('015cfb99-c1e5-4a9e-a58e-1ce55356a41b')
    }
  stages {
            stage('Check Modified Files') {
            steps {
                script {
                    // Get changed files in order, without commit messages or empty lines
                    def changes = sh(script: "git diff --name-only HEAD~1 HEAD", returnStdout: true).trim().split("\n")

                    // Define Angular file path indicators
                    def angularPaths = ["development/surveillance_app/public/views/dev_portal/surveillance-app/"]

                    // Laravel files are all files that are NOT in angularPaths
                    def laravelChanges = changes.findAll { file -> !angularPaths.any { file.startsWith(it) } }

                    // Determine build triggers
                    env.BUILD_LARAVEL = laravelChanges ? "true" : "false"
                    env.BUILD_ANGULAR = changes.any { file -> angularPaths.any { file.startsWith(it) } } ? "true" : "false"
                }
            }
        }
                stage('Run Backend and Frontend in Parallel') {
            parallel {
        stage('PRODUCTION OF LARAVEL SIDE') {
                        when {
                expression { return env.BUILD_LARAVEL == "true" }
            }
                    steps {
                        sh '''#!/bin/bash
                        ###### PRODUCTION OF LARAVEL SIDE ####################
                        cd $WORKSPACE/development/surveillance_app
                        composer install --prefer-dist --no-dev -o

                        # Decrypt the .env file using the encryption key
                        php artisan env:decrypt --key=$encryptionKey --force

                        sed -i \'2s/local/production/\' .env
                        sed -i \'4s/true/false/\' .env
                        sed -i \'27s/false/true/\' .env
                        php artisan optimize
                        rm .env.encrypted
                        
                        # Enable Maintenance Mode
                        #php artisan down

                        # Disable Maintenance Mode
                        #php artisan up

                        # Adjust permissions
                        chmod -R 775 $WORKSPACE/development/surveillance_app/storage
                        chmod -R 775 $WORKSPACE/development/surveillance_app/bootstrap
                        rsync -av --exclude 'public/' "$WORKSPACE/development/surveillance_app/" /var/www/eac_disease_surveillance/development/surveillance_app
                        cd /var/www/eac_disease_surveillance/development/surveillance_app
                        php artisan optimize
                        echo "✅Deployment Successful for Laravel"
                        '''
                    }
                }
                        stage('PRODUCTION OF ANGULAR SIDE') {
                                when {
                expression { return env.BUILD_ANGULAR == "true" }
            }
                    steps {
                        sh '''#!/bin/bash
                        ###### PRODUCTION OF ANGULAR SIDE ####################
                        cd $WORKSPACE/development/surveillance_app/public/views/dev_portal/surveillance_app/src/app
                        npm install
                        sed -i \'1s/development/production/\' app-settings.ts
                        cd ../../

                        # Run the ng build command and capture its output
                        build_output=$(ng build)
                        echo "$build_output"

                        # Path to the init.blade.php file
                        init_file="$WORKSPACE/development/surveillance_app/public/init.blade.php"

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
                        cp $WORKSPACE/development/surveillance_app/public/views/front-end/*.js $WORKSPACE/development/surveillance_app/public/

                        #Copy asset files
                        cp -R $WORKSPACE/development/surveillance_app/public/views/front-end/assets $WORKSPACE/development/surveillance_app/public/

                        ## DELETE EXTRA FILES #####
                        cd $WORKSPACE/development/surveillance_app/public/views/
                        #rm -rf dev_portal ppm_mobileapplication
                        find "$WORKSPACE" -mindepth 1 -maxdepth 1 ! -name "development" -exec rm -rf {} +
                        rsync -av --delete $WORKSPACE/development/surveillance_app/public/ /var/www/eac_disease_surveillance/development/surveillance_app/public/
                        echo "✅Deployment Successful for Angular"
                        '''
                    }
                }
            }
        }
    }
  }
