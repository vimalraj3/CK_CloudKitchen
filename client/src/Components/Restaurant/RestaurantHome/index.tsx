import { memo, useId } from 'react'
import Hero from './Sections/Hero'
import HowItsWork from './Sections/HowItsWork'
import AddResForm from './Sections/AddResForm'

function index() {
    return (
        <div>
            <Hero key={useId()} />
            <HowItsWork key={useId()} />
            <AddResForm key={useId()} />
        </div>
    )
}

export default memo(index)