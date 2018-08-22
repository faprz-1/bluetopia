import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

    // Sidebar visibility
    sidebarVisible: boolean
    sidebarVisibilitySubject: Subject<boolean> = new Subject<boolean>()
    
    public breadcrumbs : Array<any> = [] 

    toggleSidebarVisibilty() {
        this.sidebarVisible = !this.sidebarVisible
        this.sidebarVisibilitySubject.next(this.sidebarVisible)
    }

    // Theming
    maTheme: string
    maThemeSubject: Subject<string> = new Subject<string>()

    setTheme(color) {
        this.maTheme = color
        this.maThemeSubject.next(this.maTheme)
    }

    constructor(private zone : NgZone)  {
        // Hidden the sidebar by default
        this.sidebarVisible = true

        // // Set default theme as green
        // this.maTheme = 'green'
        this.maTheme = 'teal'
    }
    
    setBreadcrumbs(bread){ 
        this.zone.run(()=>{ 
            this.breadcrumbs= bread; 
        }); 
    } 


}