// lib/firebase/posts.ts
import { db, storage } from '@/app/firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// export async function updatePost(
//   postId: string,
//   data: {
//     title?: string
//     content: string
//     images: string[]
//   }
// ) {
//   try {
//     console.log('updatePost', postId, 'data :', data)
//     await updateDoc(doc(db, 'posts', postId), {
//       // title: data.title,
//       content: data.content,
//       thumbnailUrl: data.thumbnailUrl,
//       detailImageUrls: data.detailImageUrls,
//     })
//   } catch (error) {
//     console.error('Update failed:', error)
//     throw error
//   }
// }

export const updatePost = async (docId: string, data: Partial<Post>) => {
  const docRef = doc(db, 'posts', docId)
  return updateDoc(docRef, data)
}

