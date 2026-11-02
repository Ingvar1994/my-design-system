import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button, type ButtonSize, type ButtonVariant } from './Button'

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger']
const sizes: ButtonSize[] = ['sm', 'md', 'lg']
const states = ['default', 'hover', 'pressed', 'focus', 'disabled'] as const

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M8 3v10M3 8h10" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

const row = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 } as const

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { children: 'Button', onClick: fn() },
  argTypes: {
    iconLeft: { control: false },
    iconRight: { control: false },
  },
  decorators: [
    // Tokens only make sense on their theme's canvas: ghost text is invisible on Storybook's white.
    (Story, { globals }) => (
      <div data-theme={globals.theme} style={{ padding: 'var(--space-32)', background: 'var(--bg-canvas)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Danger: Story = { args: { variant: 'danger' } }

export const Disabled: Story = { args: { disabled: true } }

export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      {sizes.map((size) => (
        <Button key={size} {...args} size={size} />
      ))}
    </div>
  ),
}

export const WithIcons: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} iconLeft={<PlusIcon />} />
      <Button {...args} iconRight={<ArrowIcon />} />
      <Button {...args} iconLeft={<PlusIcon />} iconRight={<ArrowIcon />} />
    </div>
  ),
}

/** All 60 Figma variants. Hover, pressed and focus are forced with `data-state`. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--space-48)' }}>
      {sizes.map((size) => (
        <div
          key={size}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: 'var(--space-24) var(--space-32)', alignItems: 'center' }}
        >
          {states.flatMap((state) =>
            variants.map((variant) => (
              <Button
                key={`${variant}-${state}`}
                {...args}
                variant={variant}
                size={size}
                disabled={state === 'disabled'}
                data-state={state}
              />
            )),
          )}
        </div>
      ))}
    </div>
  ),
}
