// lib/firebase/posts.ts
import { db, storage } from '@/app/firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export async function updatePost(
  postId: string,
  data: {
    title: string
    content: string
    images: string[]
  }
) {
  try {
    await updateDoc(doc(db, 'posts', postId), {
      title: data.title,
      content: data.content,
      images: data.images,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error('Update failed:', error)
    throw error
  }
}
