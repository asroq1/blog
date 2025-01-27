/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/firebase/posts.ts
import { db } from '@/app/firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'

interface Post {
  title?: string
  content: string
  thumbnailUrl: string
  detailImageUrls: string[]
}

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

export const updatePost = async (docId: any, data: Partial<Post>) => {
  const docRef = doc(db, 'posts', docId)
  return updateDoc(docRef, data)
}
