import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import BookableForm from "./BookableForm";
import useFormState from "./useFormState";
import { createItem } from "../../utils/api";
import Spinner from "../UI/Spinner";

export default function BookableNew () {
    const navigate = useNavigate()
    const formState = useFormState();

    const queryClient = useQueryClient()

    /* 
        NB: The useMutation hook returns an object containing the mutate function and status values:
        const {mutate, status, error} = useMutation(asyncFunction, config);
    */
    const { mutate: createBookable, status, error }= useMutation(
        item => createItem("http://localhost:3001/bookables", item),
        {
            // Set an onSuccess callback that receives the newly created bookable from the server
            onSuccess: bookable => {
                // Add the new bookable to the "bookables" query cache.
                queryClient.setQueryData(
                    "bookables",
                    old => [...(old || []), bookable]
                )
                navigate(`/bookables/${bookable.id}`); // navigate to the newly created bookable
            }
        }
    )
    

  function handleSubmit () {
    // Call the createBookable mutation function with the fields for the new bookable.
    createBookable(formState.state)
  }

  if (status === "error") {
    return <p>{error.message}</p>
  }

  if (status === "loading") {
    return <Spinner />
  }

  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
    />
  );
}