import ViewButton from '@/components/view-button';
import { useState } from 'react';

const views = [{ view: 2 }, { view: 3 }];
export default function ViewToggle() {
    const [active, setActive] = useState(0);
    return (
        <div className="space-x-4">
            {views.map((item, i) => (
                <ViewButton onClick={() => setActive} active={i === active} grid={item.view} />
            ))}
        </div>
    );
}
