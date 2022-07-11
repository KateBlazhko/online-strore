export interface IParamSorter {
  [key: string]: boolean;
}

export const paramSorter: IParamSorter = {
  "Name A-Z.model.up": false,
  "Name Z-A.model.down": false,
  "Oldest.release.up": false,
  "Newest.release.down": false,
  "Lowest price.price.up": false,
  "Highest price.price.down": false,
};
