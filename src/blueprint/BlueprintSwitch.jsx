import { useBlueprint } from './BlueprintContext.jsx';

export default function BlueprintSwitch() {
  const { on, toggle } = useBlueprint();

  return (
    <button type="button" role="switch" aria-checked={on} className="bp-switch" onClick={toggle}>
      <span className="bp-switch__track" aria-hidden="true">
        <span className="bp-switch__knob" />
      </span>
      Blueprint
    </button>
  );
}
