import PageHeader from '../components/PageHeader';

function HomePage() {
    return (
        <div className='card'>
            <div className='card-body'>
                <PageHeader title="Demo Laptop App"
                description="Demo Page using react router"/>
                <ol className='mb-o'>
                    <li>Go to Auth page to login or register a new account</li>
                    <li>After login , you can create new product</li>
                </ol>
            </div>
        </div>
    );
}

export default HomePage;