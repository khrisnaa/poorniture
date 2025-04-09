import ViewButton from '@/components/view-button';
import { useViewContext } from '@/context/view-context';

const views = [{ view: 2 }, { view: 3 }];

export default function ViewToggle() {
    const { activeView, setActiveView } = useViewContext();

    return (
        <div className="space-x-4">
            {views.map((item, i) => (
                <ViewButton key={i} onClick={() => setActiveView(item.view)} active={item.view === activeView} grid={item.view} />
            ))}
        </div>
    );
}
