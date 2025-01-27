import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, doc, getDocs, limit, query, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/app/firebase/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const aboutQuery = query(collection(db, 'about'), limit(1))
      const snapshot = await getDocs(aboutQuery)

      console.log(
        'Firestore Response:',
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )

      if (snapshot.empty) throw new Error('About data not found')

      return snapshot.docs[0].data()
    },
  })
}

export function useUpdateAbout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      content,
      imageFile,
      existingImageUrl,
    }: {
      content: string
      imageFile?: File
      existingImageUrl?: string
    }) => {
      const docRef = doc(db, 'about', '2RxRX0U18j4g5aTAfc4D')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = {
        content,
        aboutUrl: existingImageUrl, // 기존 이미지 URL 유지
      }

      if (imageFile) {
        const storageRef = ref(storage, `about/${Date.now()}-${imageFile.name}`)
        const snapshot = await uploadBytes(storageRef, imageFile)
        updateData.aboutUrl = await getDownloadURL(snapshot.ref)
      }

      await updateDoc(docRef, updateData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] })
    },
  })
}
