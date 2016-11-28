export function selectBook(book){
    //selectBook is an ActionCreator. it needs to return an action,
    // an objecct with a type properrty
    return {
        type: 'BOOK_SELECTED',
        payload: book
    }
}