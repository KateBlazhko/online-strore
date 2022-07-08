export function removeClassName(className: string,...elements: HTMLElement[]) {
  for (const element of elements) {
    element.classList.remove(className);
  }
}

export function toggleClassName(className: string,...elements: HTMLElement[]) {
  for (const element of elements) {
    element.classList.toggle(className);
  }
}

export function addClassName(className: string,...elements: HTMLElement[]) {
  for (const element of elements) {
    element.classList.add(className);
  }
}


export function sorter(arr: Record<string, string>[], param : string, value: string | Record<string, string>) {
  const pItem = arr.filter(item => typeof value === 'string' ? 
    item[param] === value : 
    +item[param] >= +value.left && +item[param] <= +value.right)

 return pItem
}