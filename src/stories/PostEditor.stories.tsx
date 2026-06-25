import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PostEditor } from '@/components/PostEditor'

const meta = {
  component: PostEditor,
} satisfies Meta<typeof PostEditor>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
