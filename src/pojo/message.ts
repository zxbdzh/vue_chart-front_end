export interface Message {
  id: number // id
  content: string // 聊天内容
  date: string
  type: 'received' | 'sent'
}
