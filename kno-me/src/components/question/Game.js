import React from 'react';
// import '../../App.css';
import Dashboard from './Dashboard';
import Store from './Store';
// import { Link } from 'rout'
export default function Game() {
    return (
        <div className="Game">
            {/* By wrapping Store around Dashboard we can use context pull out of store */}
            <Store>
                {/* Children of store */}
                <Dashboard />
            </Store>
        </div>
    );
}
