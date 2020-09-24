import React from 'react';
import Link from 'next/link';

const CancelPage: React.FC = () => {
    
    return (
        <>
            <div>
                <h1>
                    Canceled.
                </h1>

                <Link href="/">Go Back</Link>
            </div>
        </>
    )
}

export default CancelPage;