# Arkham Horror LCG Deck Buddy

An exploration in using LLMs (chatGPT) to assist in the deckbuilding process for the [Arkham Horror Living Card Game](https://en.wikipedia.org/wiki/Arkham_Horror:_The_Card_Game).

## Plan

### v1: Comment on existing deck (from [ArkhamDB](https://arkhamdb.com/))

- [x] Create basic layout in frontend
- [x] Hook up Deck Import fetch
- [x] Create backend and hook up end-to-end ChatGPT API interaction
- [x] Figure out initial ChatGPT prompt
- [ ] Hi-fi mock for Frontend (Figma)
- [ ] Implement design in FE
- [ ] Deploy App
- [ ] General code refactor / cleanup (move ArkhamDB API interaction to BE?)

### v2: Allow ChatGPT to edit `deck` in App

- [ ] Figure out how to have ChatGPT API register deck checkes (see [here](https://community.openai.com/t/the-system-role-how-it-influences-the-chat-behavior/87353/8))

### v3: Integration to ArkhamDB to automatically register changes

- [ ] Implement OAuth2 delegation request flow for CRUD ops on ArkhamDB API
- [ ] Request access to Kamalisk to register the App with ArkhamDB

### Misc

- [ ] Explore other `roles` for ChatGPT API, especially `system` (see [here](https://community.openai.com/t/the-system-role-how-it-influences-the-chat-behavior/87353))
- [ ] Look into more involved ChatGPT API flow for better responses (see [here](https://community.openai.com/t/the-system-role-how-it-influences-the-chat-behavior/87353/28))

## Thanks

- [Kamalisk](https://github.com/Kamalisk), for maintaining [ArkhamDB](https://arkhamdb.com/)
- [KrytenKoro](https://arkhamhorrorfiles.fandom.com/wiki/Special:Contributions/KrytenKoro), for uploading the autofail favicon to arkhamhorrorfiles.fandom.com
