import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

@Component({
  selector: 'app-sharednavigation',
  templateUrl: './sharednavigation.component.html',
  styleUrl: './sharednavigation.component.css'
})
export class SharednavigationComponent {
  
  @Input() navigation_type_id: number;
  @Input() dashboard_title: string;
  isLoggedIn: any;
  isDropdownOpen: boolean = false;// Define a variable to keep track of the dropdown visibility
  userGroupName: string = ''; // Initialize with an empty string or default value
  userFirstName: string = '';
  userCountryOfOrigin: string = '';
  appmenuItems: any[] = [];
  response: any;
  loggedInUserNavigationItems: any[] = []; // Add a property to store the user-specific navigation items 
  decryptedPayload:any

  constructor(
    private router: Router,
    private translate: TranslateService,
    public authService: AuthenticationService,
    public toastr: ToastrService,
    private workflow: WokflowManagementService,
    public encryptionService: EncryptionService
  ) {
    this.getUserNavigationItems();


    // Configuring ngx-translate
    translate.addLangs([]);
    translate.setDefaultLang('English'); // Default language
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang && browserLang.match(/English|French|Swahili/) ? browserLang : 'English');
  }


  // Function to toggle dropdown visibility
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  // MENU FOR THE THREE LEVELS
  toggleGroup(group: any): void {
    
    group.expanded = !group.expanded;
    
    // Recursively toggle children if any
    if (group.children) {
      group.children.forEach((child: any) => {
        this.toggleGroup(child);
      });
    }
  }

  isGroupOpen(group: any): boolean {
    // 
    return group.expanded;
  }

  isGroupExpanded(group: any): boolean {
    return group.expanded || false;
  }

  toggleChildGroup(childGroup: any): void {
    
    childGroup.expanded = !childGroup.expanded;
  }
  ngOnInit(): void {

    this.getUserNavigationItems();

    this.authService.getUserGroupName().subscribe((userGroupName: string) => {
      this.userGroupName = userGroupName;
      this.retrieveLoggedInUserNavigationItems(); // Fetch navigation items after getting userGroupName
    });

    this.authService.getUserFirstName().subscribe((userFirstName: string) => {
      this.userFirstName = userFirstName;
    });

    this.authService.getCountryOfOrigin().subscribe((userCountryOfOrigin: string) => {
      this.userCountryOfOrigin = userCountryOfOrigin;
    });

  }

  filterItemsByGroup(groupName: string): any[] {
    // Assuming appmenuItems has a property 'groupName' for each item
    return this.appmenuItems.filter(item => item.groupName === groupName);
  }

  navigate(childItem: any): void {
    if (childItem && childItem.routerLink) {
      this.router.navigateByUrl(childItem.routerLink);
    }
  }

  logGroupName(group: any): void {
    
  }

  toggleItem(item: any): void {
    item.expanded = !item.expanded;
  }

  isItemExpanded(item: any): boolean {
    return item.expanded || false;
  }

  // Inside AppmenuComponent
  logItemName(item: any): void {
    
  }

  logContentName(content: any): void {
    
  }


  // Method to check if an item has level 2 children
  hasLevel2Children(item: any): boolean {
    return item.children && item.children.some(child => child.children && child.children.length > 0);
  }

  // Function to get translations
  getTranslation(key: string): string {
    let translation: string = ''; // Initialize with an empty string or a default value
    this.translate.get(key).subscribe((res: string) => {
      translation = res;
    });
    return translation;
  }
  // logout method starts here
  funclogOut() {
    this.authService.funcUserLogOut();
  }
  getUserNavigationItems() {
    this.workflow.getUserNavigationItems(this.navigation_type_id)
      .subscribe(
        data => {
          this.response = data;
          if (this.response.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.response.navigation_items);
            this.loggedInUserNavigationItems= this.decryptedPayload;
            
          }

        },
        error => {
          
        });


  }

  retrieveLoggedInUserNavigationItems(): void {
    const storedNavigationItems = localStorage.getItem('navigation_items');
    if (storedNavigationItems) {
      const parsedItems = JSON.parse(storedNavigationItems);
      this.loggedInUserNavigationItems = parsedItems.filter(
        (item: any) => item.level >= 0 && item.level <= 2
      );
      
    }
  }
}
