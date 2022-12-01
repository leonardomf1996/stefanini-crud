export const map = (collection: any): any => {
   const { _id, ...collectionWithoutId } = collection;
   return Object.assign({}, collection, { id: _id });
}