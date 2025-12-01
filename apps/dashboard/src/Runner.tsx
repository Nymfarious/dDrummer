import { resolveBaseUrl, isAllowedUrl } from './utils/resolveBaseUrl'

export default function Runner() {
  const raw = new URLSearchParams(window.location.search).get('u') || ''
  const isValid = isAllowedUrl(raw)
  const src = isValid ? resolveBaseUrl(raw) : 'about:blank'

  return (
    <div className="h-dvh w-dvw p-2 bg-neutral-950">
      {isValid ? (
        <iframe
          src={src}
          className="w-full h-full rounded-2xl border border-neutral-800"
          title="Module Runner"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-red-500 text-lg">
          Invalid or disallowed URL.
        </div>
      )}
    </div>
  )
}
