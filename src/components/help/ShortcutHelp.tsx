import React from 'react';


const shortcuts = [
    [
        { key: ['esc'], description: "Deselect" },
        { key: ['h'], description: "Shortcut Help" },
        { key: ['q'], description: "Selection" },
        { key: ['w'], description: "Grab" },
        { key: ['o'], description: "Zoom 1:1" },
        { key: ['p'], description: "Zoom Fit" },
        { key: ['+'], description: "Zoom In" },
        { key: ['-'], description: "Zoom Out" },
        { key: ['↑'], description: "Move Up" },
        { key: ['↓'], description: "Move Down" },
        { key: ['←'], description: "Move Left" },
        { key: ['→'], description: "Move Right" },
    ],
    [
        { key: ['delete | backspace'], description: "Delete" },
        { key: ['ctrl | cmd', 'a'], description: "Select All" },
        { key: ['ctrl | cmd', 'c'], description: "Copy" },
        { key: ['ctrl | cmd', 'v'], description: "Paste" },
        { key: ['ctrl | cmd', 'x'], description: "Cut" },
        { key: ['ctrl | cmd', 'z'], description: "Undo" },
        { key: ['ctrl | cmd', 'y'], description: "Redo" },
        { key: ['alt', 'mouse left'], description: "Grab" },
        { key: ['shift', 'mouse left'], description: "Multi Selection" },
        { key: ['mouse left'], description: "Select" },
        { key: ['mouse right'], description: "Context Memu" },
    ],
];

const ShortcutHelp: React.SFC = () => {
    return (
        <div className="rde-shortcut-help">
            {shortcuts.map((column, idx) => {
                return (
                    <ul className="rde-shortcut-help-list" key={idx}>
                        {column.map(shortcut => {
                            return (
                                <li key={shortcut.key.toString()} className="rde-shortcut-help-key">
                                    {shortcut.key.map(key => {
                                        return (
                                            <kbd key={key} className="rde-shortcut-help-key-unit">
                                                <span>{key}</span>
                                            </kbd>
                                        );
                                    })}
                                    <span className="rde-shortcut-help-key-def">
                                        {shortcut.description}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                );
            })}
        </div>
    );
};

export default ShortcutHelp;
