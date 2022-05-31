import { shallowMount, mount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe("Indecision Component", () => {
	let wrapper, varSpy;

	beforeEach(() => {
		wrapper = shallowMount(Indecision);
		varSpy = jest.spyOn(console, "log");
	});

	test("should match with the snapshot", () => {
		const wrapper = shallowMount(Indecision);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test("shouldn't trigger anything meanwhile the input is being filled", async () => {
		const getAnswer = jest.spyOn(wrapper.vm, "getAnswer");
		const input = wrapper.find("input");

		await input.setValue("My question");

		expect(varSpy).toHaveBeenCalledTimes(1);
		expect(getAnswer).not.toHaveBeenCalled();
	});

	test("should trigger the api call when the symbol '?' is detected", () => {});

	test("getAnswer - success", () => {});

	test("getAnswer - fail", () => {});
});
