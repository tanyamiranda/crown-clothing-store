import ShopActionTypes from './shop.types';
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionStartAsync = () => {
    return dispatch => {

        dispatch(fetchCollectionsStart());

        const collectionRef = firestore.collection("collections").orderBy("sortOrder", "asc");

        collectionRef.get().then(
            snapshot => {
                const collectionsMap = convertCollectionSnapshotToMap(snapshot);
                dispatch(fetchCollectionSuccess(collectionsMap));
            }
        ).catch(
            error => dispatch(fetchCollectionsFailure(error.message))
            );
        
    }
}

export const fetchCollectionSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

