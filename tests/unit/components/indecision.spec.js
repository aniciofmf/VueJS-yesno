import { shallowMount, mount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

var promiseObj = { answer: "yes", force: "false", image: "https://yesno.wtf/assets/yes/2.gif" };

describe("Indecision Component", () => {
	var wrapper, varSpy;

	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve(promiseObj),
		})
	);

	beforeEach(() => {
		wrapper = shallowMount(Indecision);
		varSpy = jest.spyOn(console, "log");
		jest.clearAllMocks();
	});

	test("should match with the snapshot", () => {
		let wrapper = shallowMount(Indecision);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test("shouldn't trigger anything meanwhile the input is being filled", async () => {
		let getAnswer = jest.spyOn(wrapper.vm, "getAnswer");
		let input = wrapper.find("input");

		await input.setValue("My question");

		expect(varSpy).toHaveBeenCalledTimes(1);
		expect(getAnswer).not.toHaveBeenCalled();
	});

	test("should trigger getAnswer when the symbol '?' is detected", async () => {
		let getAnswer = jest.spyOn(wrapper.vm, "getAnswer");
		let input = wrapper.find("input");

		await input.setValue("My question?");

		expect(getAnswer).toHaveBeenCalledTimes(1);
	});

	test("getAnswer - success", async () => {
		await wrapper.vm.getAnswer();

		expect(wrapper.vm.img).toBe(promiseObj.image);
		expect(wrapper.vm.answer).toBe(promiseObj.answer);
	});

	test("getAnswer - fail", async () => {
		let img = wrapper.find("img");

		fetch.mockImplementationOnce(() => Promise.reject("API Fail"));

		await wrapper.vm.getAnswer();

		expect(img.exists()).toBeFalsy();
		expect(wrapper.vm.error).toBe("API Fail");
	});
});
