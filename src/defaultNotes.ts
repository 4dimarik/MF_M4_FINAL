import { db } from './db';

export default async function defaultNotes() {
  await db.notes.bulkAdd([
    {
      title: 'State Hooks',
      content:
        '<h2 style="text-align: start"><strong>State Hooks</strong></h2><p><em>State</em> lets a component <a target="_blank" rel="noopener noreferrer nofollow" class="inline text-link dark:text-link-dark border-b border-link border-opacity-0 hover:border-opacity-100 duration-100 ease-in transition leading-normal" href="https://react.dev/learn/state-a-components-memory">“remember” information like user input.</a> For example, a form component can use state to store the input value, while an image gallery component can use state to store the selected image index.</p><p style="text-align: start">To add state to a component, use one of these Hooks:</p><ul><li><p><code>useState</code> declares a state variable that you can update directly.</p></li><li><p><code>useReducer</code> declares a state variable with the update logic inside a <a target="_blank" rel="noopener noreferrer nofollow" class="inline text-link dark:text-link-dark border-b border-link border-opacity-0 hover:border-opacity-100 duration-100 ease-in transition leading-normal" href="https://react.dev/learn/extracting-state-logic-into-a-reducer">reducer function.</a></p></li></ul><pre><code>function ImageGallery() {\n  const [index, setIndex] = useState(0);\n  // ...</code></pre>',
      createdAt: 1693767630,
      updatedAt: 1693768845,
    },
    {
      title: 'Ref Hooks',
      content:
        '<h2 style="text-align: start"><strong>Ref Hooks</strong></h2><p style="text-align: start"><em>Refs</em> let a component <a target="_blank" rel="noopener noreferrer nofollow" class="inline text-link dark:text-link-dark border-b border-link border-opacity-0 hover:border-opacity-100 duration-100 ease-in transition leading-normal" href="https://react.dev/learn/referencing-values-with-refs">hold some information that isn’t used for rendering,</a> like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as the built-in browser APIs.</p><ul><li><p><code>useRef</code> declares a ref. You can hold any value in it, but most often it’s used to hold a DOM node.</p></li><li><p><code>useImperativeHandle</code> lets you customize the ref exposed by your component. This is rarely used.</p></li></ul><pre><code>function Form() {\n    const inputRef = useRef(null);\n    // ...</code></pre>',
      createdAt: 1693768113,
      updatedAt: 1693769376,
    },
    {
      title: 'Context Hooks',
      content:
        '<h2 style="text-align: start"><strong>Context Hooks</strong></h2><p style="text-align: start"><em>Context</em> lets a component <a target="_blank" rel="noopener noreferrer nofollow" class="inline text-link dark:text-link-dark border-b border-link border-opacity-0 hover:border-opacity-100 duration-100 ease-in transition leading-normal" href="https://react.dev/learn/passing-props-to-a-component">receive information from distant parents without passing it as props.</a> For example, your app’s top-level component can pass the current UI theme to all components below, no matter how deep.</p><ul><li><p><code>useContext</code> reads and subscribes to a context.</p></li></ul><pre><code>function Button() {\n    const theme = useContext(ThemeContext);\n    // ...</code></pre>',
      createdAt: 1693768459,
      updatedAt: 1693769331,
    },
  ]);
}
