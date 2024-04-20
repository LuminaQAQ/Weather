const baseURL = "/Weather/src/assets/icons";
const rich_options = {};
for (let i = 100; i < 2427; i++) {
    rich_options['icon_' + i] = {
        backgroundColor: {
            image: `${baseURL}/${i}.svg`
        },
        height: 16,
    }
}

export default rich_options;