/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/app/firebase/firebase'

// 게시물 조회 훅
export function usePost(postId: string) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      // 숫자 ID로 문서 찾기
      const q = query(collection(db, 'posts'), where('id', '==', Number(postId)))

      const snapshot = await getDocs(q)

      if (snapshot.empty) throw new Error('Post not found')

      const post = snapshot.docs[0].data()
      console.log('받아온 데이터', post)
      return { id: post.id, ...post }
    },
  })
}

// 게시물 수정 조회 훅
export function useUpdate(postId: string): { data: any | null; isLoading: boolean } {
  return useQuery({
    queryKey: ['update', postId],
    queryFn: async () => {
      const q = query(collection(db, 'posts'), where('id', '==', Number(postId)))
      const snapshot = await getDocs(q)

      if (snapshot.empty) throw new Error('Post not found')

      const doc = snapshot.docs[0]
      return {
        ...doc.data(),
        docId: doc.id, // Firestore 문서 ID 추가
      }
    },
  })
}

export const deletePost = async (id: string) => {
  const q = query(collection(db, 'posts'), where('id', '==', Number(id)))
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    const docId = snapshot.docs[0].id
    await deleteDoc(doc(db, 'posts', docId))
  }
}
