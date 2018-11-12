import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * A través de este componente se cambia el tema de la aplicación al color especificado. Se pueden añadir mas colores añadiendo entradas
 * al archivo assets/scss/_theme.scss
 */
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

        // Set default theme
        this.setTheme('orange')
    }
    
    setBreadcrumbs(bread){ 
        this.zone.run(()=>{ 
            this.breadcrumbs= bread; 
        }); 
    } 


}