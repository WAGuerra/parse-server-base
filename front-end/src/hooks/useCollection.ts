import {
  useEffect,
  useRef,
  useState,
} from 'react';
import Parse, {LiveQuerySubscription} from 'parse';
import {RequestStatus} from '../enums/parse';
import {makeCancelable} from '../helpers/Promise';
import {BaseDocument} from '../parse/BaseDocument';
import {useHandleError} from './useHandleError';

/**
 *
 */
interface useCollectionOptions {
  fieldName?: string,
  foreignKey?: any,
  query?: string,
  queryFieldName?: string,
  ascending?: string,
  descending?: string,
  limit?: number,
  liveQueryOn?: boolean
}

/**
 * Get the collection from Document
 * @param documentName
 * @param options
 * @return [Array<T>, RequestStatus]
 */
export const useCollection = <T extends BaseDocument>(
    documentName: string,
    options?: useCollectionOptions,
): [T[], RequestStatus] => {
  const [collection, setCollection] = useState<T[]>([]);
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.loading);
  const liveQuerySubscription = useRef<LiveQuerySubscription>();
  const handleError = useHandleError();
  
  const {
    fieldName,
    foreignKey,
    ascending,
    descending,
    limit,
    liveQueryOn,
    query,
    queryFieldName,
  } = options || {};
  
  useEffect(
      () => {
        const collectionQuery = new Parse.Query<T>(documentName);
        
        if (fieldName && foreignKey) {
          collectionQuery.equalTo(fieldName, foreignKey);
        }
        
        if (ascending && !descending) {
          collectionQuery.ascending(ascending);
        }
        
        if (!ascending && descending) {
          collectionQuery.descending(descending);
        }
        
        if (limit != null) {
          collectionQuery.limit(limit);
        }
        
        if (query && queryFieldName) {
          collectionQuery.contains(queryFieldName, query);
        }
        
        let subscribeQuery: Promise<any>,
            cancelSubscribeQuery: Function;
        
        if (liveQueryOn) {
          [subscribeQuery, cancelSubscribeQuery] = makeCancelable(
              collectionQuery.subscribe());
          subscribeQuery
              .then((subscription) => {
                subscription.on('create', (object: T) => {
                  setCollection(collection => [...collection, object]);
                });
                subscription.on('update', (object: T) => {
                  setCollection(col => {
                    let objIndex: number = -1;
                    const newCollection = col.filter((obj, index) => {
                      objIndex = index;
                      return obj.id === object.id;
                    });
                    if (objIndex >= 0 && objIndex < newCollection.length) {
                      newCollection.splice(objIndex, 0, object);
                    }
                    
                    return newCollection;
                  });
                });
                subscription.on('delete', (object: T) => {
                  setCollection(col => col.filter(
                      (obj) =>
                          obj.id !== object.id,
                      ),
                  );
                });
                liveQuerySubscription.current = subscription;
              }).catch(handleError);
        }
        
        setStatus(RequestStatus.loading);
        const [promise, cancel] = makeCancelable(collectionQuery.find());
        promise
            .then(
                (founded) => {
                  setCollection(founded);
                  setStatus(RequestStatus.success);
                },
                async (error) => {
                  await handleError(error);
                  setStatus(RequestStatus.fail);
                },
            ).catch(handleError);
        return () => {
          cancel();
          cancelSubscribeQuery && cancelSubscribeQuery();
          liveQuerySubscription.current
          && liveQuerySubscription.current.unsubscribe();
        };
      },
      [
          handleError,
        documentName,
        ascending,
        descending,
        fieldName,
        foreignKey,
        limit,
        liveQueryOn,
        query,
        queryFieldName
      ],
  );
  
  return [
    collection,
    status,
  ];
};
