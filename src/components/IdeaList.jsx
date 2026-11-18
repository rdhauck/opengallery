import { Link } from 'react-router';

const IDEAS = [
  {
    title: 'Routes',
    text: 'The web address decides which page appears.',
    to: '/how-it-works#routing',
  },
  {
    title: 'Templates',
    text: 'A few layouts with empty slots hold every page.',
    to: '/how-it-works#templates',
  },
  {
    title: 'Live data',
    text: 'An API delivers the artworks each time you visit.',
    to: '/how-it-works#data',
  },
];

export default function IdeaList() {
  return (
    <ol className="ideas" data-part="component" data-name="IdeaList">
      {IDEAS.map((idea, index) => (
        <li key={idea.title}>
          <span className="ideas__number">{index + 1}</span>
          <h2>{idea.title}</h2>
          <p>{idea.text}</p>
          <Link to={idea.to} className="text-link" aria-label={`Learn about ${idea.title}`}>
            Learn more
          </Link>
        </li>
      ))}
    </ol>
  );
}
