import { useQuery } from "@tanstack/react-query"
import fetch from "../../../services/api.ts"

export function useFetchGalleryQuery() {
  const { isPending, data, error } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const response = await fetch({
        url: `gallery?_embed&acf_format=standard&per_page=6`,
        method: "GET",
      })
      return (response.data as any[]).map(
        (item) =>
          ({
            id: item.id,
            src: item.acf.image,
            alt: item.title.rendered,
            label: item.title.rendered,
          }) as GalleryImage,
      )
    },
  })

  return {
    isPending,
    error,
    data,
  }
}

