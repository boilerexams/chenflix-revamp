import { Switch } from '@nextui-org/react'
import { useState } from 'react'

const MyComponent = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);

    const container = document.getElementById('classEventContainer');
    Array.from(container.children).reverse().forEach(child => container.appendChild(child));
  };

  return (
    <div className="switch-container">
      <Switch checked={checked} onChange={handleChange} />
    </div>
  );
}

export default MyComponent;