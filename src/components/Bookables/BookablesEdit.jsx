import { useParams } from "react-router-dom";
import { useQueryClient, useQuery } from "react-query";

import useFormState from "./useFormState";
import getData from "../../utils/api";

import BookableForm from "./BookableForm";
import Spinner from "../UI/Spinner";

export default function BookableEdit() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  /* 
    React Query’s useQuery hook accepts a config object as a third argument
    const {data, isLoading} = useQuery(key, asyncFunction, config);
    
    The config lets the calling code control all kinds of query-related functionality, such as:
    a. Cache expiry
    b. Retry policies when fetching-errors occur 
    c. Callback functions 
    d. Whether to work with Suspense and error boundaries 
    e. The setting of initial data
  */
  const { data, isLoading } = useQuery(
    ["bookable", id],
    () => getData(`http://localhost:3001/bookables/${id}`),
    {
      initialData: queryClient
        .getQueryData("bookables")
        ?.find((b) => b.id === parseInt(id, 10)),
    }
  );

  const formState = useFormState(data);

  function handleDelete() {}
  function handleSubmit() {}

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BookableForm 
        formState={formState}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
    />
  )
}
