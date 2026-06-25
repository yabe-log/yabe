'use client'
import { useMemo } from 'react'
import YooptaEditor, { createYooptaEditor, type PluginElementRenderProps, type YooptaContentValue } from '@yoopta/editor'
import Accordion from '@yoopta/accordion'
import Blockquote from '@yoopta/blockquote'
import Callout from '@yoopta/callout'
import { Code } from '@yoopta/code'
import Divider from '@yoopta/divider'
import Embed from '@yoopta/embed'
import Emoji, { withEmoji } from '@yoopta/emoji'
import File from '@yoopta/file'
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings'
import Image from '@yoopta/image'
import Link from '@yoopta/link'
import { BulletedList, NumberedList, TodoList } from '@yoopta/lists'
import { MathInline, MathBlock, withMath } from '@yoopta/math'
import Paragraph from '@yoopta/paragraph'
import Steps from '@yoopta/steps'
import Table from '@yoopta/table'
import TableOfContents from '@yoopta/table-of-contents'
import Video from '@yoopta/video'
import { Bold, Italic, Underline, Strike, CodeMark, Highlight } from '@yoopta/marks'
import { FloatingToolbar, FloatingBlockActions, SlashCommandMenu } from '@yoopta/ui'

// TODO: setup upload option for File, Image and Video plugin https://docs.yoopta.dev/plugins/file
const plugins = [Accordion, Blockquote, Callout, Code, Divider, Embed, Emoji, File, HeadingOne.extend({
  elements: {
    'heading-one': {
      render: ({ children, attributes }: PluginElementRenderProps) => {
        return (
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight text-balance' {...attributes}>
            {children}
          </h1>
        )
      }
    }
  }
}), HeadingTwo.extend({
  elements: {
    'heading-two': {
      render: ({ children, attributes }: PluginElementRenderProps) => {
        return (
          <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0' {...attributes}>
            {children}
          </h2>
        )
      }
    }
  }
}), HeadingThree.extend({
  elements: {
    'heading-three': {
      render: ({ children, attributes }: PluginElementRenderProps) => {
        return (
          <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight' {...attributes}>
            {children}
          </h3>
        )
      }
    }
  }
}), Image, Link, BulletedList, NumberedList, TodoList, MathInline, MathBlock, Paragraph.extend({
  elements: {
    paragraph: {
      render: ({ children, attributes }: PluginElementRenderProps) => {
        return (
          <p className='leading-7 not-first:mt-6' {...attributes}>
            {children}
          </p>
        )
      }
    }
  }
}), Steps, Table, TableOfContents, Video]
const marks = [Bold, Italic, Underline, Strike, CodeMark, Highlight]
const initialBlockId = 'initial-paragraph'

const createInitialValue = (editor: ReturnType<typeof createYooptaEditor>): YooptaContentValue => {
  return {
    [initialBlockId]: {
      id: initialBlockId,
      type: 'Paragraph',
      value: [editor.y('paragraph', { children: [editor.y.text('')] })],
      meta: {
        order: 0,
        depth: 0,
        align: 'left'
      }
    }
  }
}

export const PostEditor = () => {
  const editor = useMemo(() => {
    const instance = withMath(withEmoji(createYooptaEditor({ plugins: plugins as never, marks })))
    instance.setEditorValue(createInitialValue(instance))
    return instance
  }, [])

  return (
    <YooptaEditor
      editor={editor}
      // onChange={(value) => console.log(value)}
      placeholder='Type something...'
      autoFocus
      className='w-full min-h-96 rounded-3xl border border-border bg-background px-5 py-4 shadow-sm'
    >
      <FloatingToolbar />
      <FloatingBlockActions />
      <SlashCommandMenu />
    </YooptaEditor>
  )
}
