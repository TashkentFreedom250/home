// src/components/StatusTag.jsx
// New shared component — import and use wherever status labels appear.
// Usage: <StatusTag kind="error">Not started</StatusTag>

const KIND_CLASS = {
  info:    'tag-info',
  success: 'tag-success',
  warn:    'tag-warn',
  error:   'tag-error',
  ink:     'tag-ink',
  subtle:  'tag-subtle',
}

export default function StatusTag({ kind = 'subtle', children, className = '' }) {
  return (
    <span className={`tag ${KIND_CLASS[kind] ?? 'tag-subtle'} ${className}`}>
      {children}
    </span>
  )
}
