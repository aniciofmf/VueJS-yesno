import { shallowMount, mount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter Component", () => {
	let wrapper;

	var btnTriggerAction = async function action(cb) {
		cb.trigger("click");
	};

	beforeAll(() => {
		wrapper = shallowMount(Counter);
	});

	/*test("should match with the snapshot", () => {
		const wrapper = shallowMount(Counter);

		expect(wrapper.html()).toMatchSnapshot();
	});*/

	test("should match with the h2 tag's default value", () => {
		const h2El = wrapper.find("h2");

		expect(h2El.exists()).toBeTruthy();
		expect(h2El.text()).toBe("Counter");
	});

	test("should match with the p last tag's default value", () => {
		const pEl = wrapper.find('[data-testid="counter"]');

		expect(pEl).toBeTruthy();
		expect(pEl.text()).not.toBe(5);
		expect(pEl.text()).toBe("5");
	});

	test("should increment and decrement the counter by 1", async () => {
		const [btnIncr, btnDecr] = wrapper.findAll("button");

		await btnTriggerAction(btnIncr);

		const pEl = wrapper.find('[data-testid="counter"]');
		expect(pEl.text()).toBe("6");

		await btnTriggerAction(btnDecr);
		expect(pEl.text()).toBe("5");
	});
});
