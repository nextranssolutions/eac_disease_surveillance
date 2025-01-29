import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface MenuItem {
  name: string;
  iconsCls: string;
  children?: MenuItem[];
  expanded?: boolean;
  level?: number;
}

@Directive({
  selector: '[appRecursiveMenu]',
})
export class RecursiveMenuDirective {
  @Input() set appRecursiveMenuOf(items: MenuItem[]) {
    this.recursiveRender(items, this.templateRef, this.viewContainer, 0);
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  private recursiveRender(items: MenuItem[], templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, level: number) {
    items.forEach((item) => {
      item.level = level;
      item.expanded = false;  // Ensure initially collapsed for all items
      viewContainer.createEmbeddedView(templateRef, { $implicit: item });
      if (item.children && item.children.length > 0) {
        this.recursiveRender(item.children, templateRef, viewContainer, level + 1);
      }
    });
  }
}
