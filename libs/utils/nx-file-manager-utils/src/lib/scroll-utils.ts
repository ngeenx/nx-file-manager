export class ScrollUtils {
  static getTopVisibleElement(event: Event): Element | null {
    if (!event.target) {
      throw new Error("onGroupContainerScroll: event.target is undefined");
    }

    const target = event.target as HTMLElement,
      parentRect = target.getBoundingClientRect();

    let closestElement: Element | null = null,
      closestDistance = Infinity;

    Array.from(target.children).forEach((child: Element) => {
      const childRect = child.getBoundingClientRect(),
        distanceFromTop = childRect.bottom - parentRect.top;

      if (distanceFromTop >= 0 && distanceFromTop < closestDistance) {
        closestDistance = distanceFromTop;
        closestElement = child;
      }
    });

    return closestElement ?? null;
  }
}
