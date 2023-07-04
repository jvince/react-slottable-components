import React, { isValidElement } from 'react';
import './App.css';

/**
 * @typedef {Object<string, import('react').ReactElement} SlotDefinition
 */

/**
 * @param {React.ReactElement[]} children
 * @param {SlotDefinition} slotDefinition
 * 
 * @return {SlotDefinition}
 */
function createSlots(children, slotDefinition) {
  const slots = Object.keys(slotDefinition).reduce(
    (acc, key) => ({ ...acc, [key]: [] }),
    {}
  );
  const slotEntries = Object.entries(slotDefinition);

  React.Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    const slotEntry = slotEntries.find(([, slotType]) => (
      slotType === child.type
    ));

    if (!slotEntry) {
      return;
    }

    slots[slotEntry[0]].push(child);
  });

  return slots;
}

function PageHeader({ children }) {
  return (
    <div className="PageHeader">
      {children}
    </div>
  );
}

function PageSidebar({ children }) {
  return (
    <aside 
      className="PageSidebar"
      aria-label="Sidebar"
    >
      {children}
    </aside>
  );
}

function PageMain({ children }) {
  return (
    <div className="PageMain">
      {children}
    </div>
  );
}

function PageLayout({ children }) {
  const slots = createSlots(children, {
    main: PageMain,
    header: PageHeader,
    sidebar: PageSidebar
  });

  return (
    <div className="PageLayout">
      {slots.sidebar}
      {slots.header}
      {slots.main}
    </div>
  );
}

PageLayout.Header = PageHeader;
PageLayout.Sidebar = PageSidebar;
PageLayout.Main = PageMain;

function App() {
  return (
    <PageLayout>
      <PageLayout.Sidebar>
        Sidebar
      </PageLayout.Sidebar>

      <PageLayout.Header>
        Header
      </PageLayout.Header>

      <PageLayout.Main>
        Main
      </PageLayout.Main>
    </PageLayout>
  );
}

export default App;
