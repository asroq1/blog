import { db, storage } from '@/app/firebase/firebase'
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

interface createPostProps {
  thumbnailImage: File
  detailImages: File[]
  content: string
  title?: string
}
async function getLastPostId(): Promise<number> {
  const q = query(collection(db, 'posts'), orderBy('id', 'desc'), limit(1))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) return 0

  return querySnapshot.docs[0].data().id || 0
}

// 포스트 생성 함수
export async function createPost({
  thumbnailImage,
  detailImages,
  content,
  title,
}: createPostProps) {
  try {
    // 마지막 ID 가져와서 + 1
    const lastId = await getLastPostId()
    const newId = lastId + 1

    const thumbnailUrl = await uploadImage(thumbnailImage, 'thumbnails')
    const detailImageUrls = await Promise.all(
      detailImages.map((file) => uploadImage(file, 'details'))
    )

    // id와 createdAt 추가
    const docRef = await addDoc(collection(db, 'posts'), {
      id: newId, // 자동 증가하는 ID
      thumbnailUrl,
      detailImageUrls,
      content,
      title,
      createdAt: serverTimestamp(), // 생성 시간 추가
    })

    return docRef.id
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, `${path}/${Date.now()}-${file.name}`)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}
