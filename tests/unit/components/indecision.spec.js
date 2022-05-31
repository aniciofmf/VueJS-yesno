import { shallowMount, mount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe("Indecision Component", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(Indecision);
	});

	test("should match with the snapshot", () => {
		const wrapper = shallowMount(Indecision);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
