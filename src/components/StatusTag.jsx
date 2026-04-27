// src/components/StatusTag.jsx
// Usage: <StatusTag kind="error">Not Started</StatusTag>
// kinds: error | success | warn | info | ink | subtle

const KIND_CLS = {
  error:   'tag-error',
  success: 'tag-success',
  warn:    'tag-warn',
  info:    'tag-info',
  ink:     'tag-ink',
  subtle:  'tag-subtle',
}

export default function StatusTag({ kind = 'subtle', children, className = '' }) {
  return (
    <span className={`tag ${KIND_CLS[kind] ?? 'tag-subtle'} ${className}`}>
      {children}
    </span>
  )
}
