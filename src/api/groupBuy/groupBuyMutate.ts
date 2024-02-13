import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGroupBuyDetailData } from "./groupBuy";

const useGroupBuyMutate = (id:number) => {
    const queryClient = useQueryClient()
    const success = {
        onSuccess: () => {
          queryClient.invalidateQueries(['groupBuy', id]);
        }
      }

    const groupBuyMutation = useMutation(getGroupBuyDetailData,success)

    return {groupBuyMutation}
}

export default useGroupBuyMutate