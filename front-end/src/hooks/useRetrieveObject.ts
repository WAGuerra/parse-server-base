import {
  useEffect,
  useState,
} from 'react';
import Parse, {LiveQuerySubscription} from 'parse';
import {RequestStatus} from '../enums/parse';
import {makeCancelable} from '../helpers/Promise';
import {BaseDocument} from '../parse/BaseDocument';
import {useHandleError} from './useHandleError';

export const useRetrieveObject = <T extends BaseDocument>(
    id?: string,
    documentName?: string,
    includeFields?: string[],
): [T | undefined, RequestStatus] => {
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.initializing);
  const [retrievedObject, setRetrievedObject] = useState<T>();
  const [liveQuerySubscription, setLiveQuerySubscription] = useState<LiveQuerySubscription>();
  const handleError = useHandleError();

  const includeFieldsJson = JSON.stringify(includeFields);

  useEffect(() => {

    if (!id || !documentName) {
      setStatus(RequestStatus.success);
      return;
    }
    setStatus(RequestStatus.loading);
    const query = new Parse.Query<T>(documentName);

    //Subscribing to livequery
    const [subscriptionPromise, cancelSubscriptionPromise] = makeCancelable(
        query.subscribe());
    subscriptionPromise.then(
        (subscription) => {
          setLiveQuerySubscription(subscription);
        },
        (error) => handleError(error),
    );
    if (includeFields && includeFields.length > 0) {
      includeFields.forEach((field) =>
          query.include(field),
      );
    }

    // Getting object
    const [promise, cancelGet] = makeCancelable(query.get(id));
    promise
        .then((foundedObject) => {
          setStatus(RequestStatus.success);
          setRetrievedObject(foundedObject);
        }, async (error) => {
          await handleError(error);
          setStatus(RequestStatus.fail);
          setRetrievedObject(undefined);
        })
        .catch(handleError);

    return () => {
      cancelSubscriptionPromise();
      cancelGet();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, documentName,includeFieldsJson, handleError]);

  useEffect(() => {
    if (!liveQuerySubscription) {
      return;
    }

    const handleCreateUpdate = (retrieved: Object) => {
      const retrievedAsT = retrieved as T;
      setRetrievedObject(object => {
        if (object && object.id === retrievedAsT.id) {
          return retrieved as T
        }
        return object;
      });
    };
    liveQuerySubscription.on('update', handleCreateUpdate);
    return () => {
      liveQuerySubscription.unsubscribe();
    };
  }, [liveQuerySubscription]);

  return [retrievedObject,status];
};
