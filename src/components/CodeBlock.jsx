export default function CodeBlock({ file, children }) {
  return (
    <figure className="code" data-part="component" data-name="CodeBlock">
      <figcaption>{file}</figcaption>
      {/* tabIndex lets keyboard users scroll long lines sideways. */}
      <pre tabIndex={0}>
        <code>{children}</code>
      </pre>
    </figure>
  );
}
