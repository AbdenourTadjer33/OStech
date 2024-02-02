import React from "react";
import { Tab as UiTab } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Tab = ({ children }) => <UiTab.Group>{children}</UiTab.Group>;

const TitleList = ({ children }) => (
    <UiTab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        {children}
    </UiTab.List>
);

const Title = ({ children }) => {
    return (
        <UiTab
            className={({ selected }) =>
                classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                        ? "bg-white text-blue-700 shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
            }
        >
            {children}
        </UiTab>
    );
};

const ContentList = ({ children }) => (
    <UiTab.Panels className="mt-2">{children}</UiTab.Panels>
);

const Content = ({ children }) => {
    return (
        <UiTab.Panel
            className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
        >
            {children}
        </UiTab.Panel>
    );
};

Tab.TitleList = TitleList;
Tab.Title = Title;
Tab.ContentList = ContentList;
Tab.Content = Content;

export default Tab;
