import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SuccessPage: React.FC = () => {
    
    const { query } = useRouter();
    
    return (
        <>
            <div>
                <h1>
                    Thank you for buying {query.ItemName}
                </h1>

                <Link href="/">Go Back</Link>
            </div>
        </>
    )
}

export default SuccessPage;