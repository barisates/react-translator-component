import {T, TF} from './index'

it('renders without crashing', () => {
    T("Test");
    TF("{0} {1}", "Format", "Test");
});