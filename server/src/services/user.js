import User from "@/database/models/user";
import dbConnect from "@/lib/database";

const mapClerkUserToSchema = function (clerkUser, googleUserId) {
  const externalAccount = clerkUser.external_accounts?.[0] || {};

  return {
    name: `${clerkUser.first_name || ""} ${clerkUser.last_name || ""}`.trim(),
    status: "active",
    otp: null,
    expiration: null,
    profilePicture: clerkUser.image_url || null,

    provider: externalAccount.provider || null,
    identificationId: externalAccount.identification_id || null,
    providerUserId: externalAccount.provider_user_id || null,
    approvedScopes: externalAccount.approved_scopes || null,
    email:
      externalAccount.email_address ||
      clerkUser.email_addresses?.[0]?.email_address ||
      null,
    firstName: externalAccount.first_name || clerkUser.first_name || null,
    lastName: externalAccount.last_name || clerkUser.last_name || null,
    imageUrl: externalAccount.image_url || clerkUser.image_url || null,
    username: externalAccount.username || clerkUser.username || null,
    googleId: externalAccount.google_id || null,
    givenName: externalAccount.given_name || null,
    familyName: externalAccount.family_name || null,
    picture: externalAccount.picture || null,
    externalAccountId: externalAccount.external_account_id || null,
    googleUserId
  };
};

export const findUserWithFields = async function (userId, fields = "") {
  await dbConnect()
  return await User
    .findOne({ googleUserId: userId })
    .select(fields)
    .lean()
}

export const findUserWithFilterRetrieveWithField = async function (
  filters,
  fields
) {
  await dbConnect()
  return await User
    .findOne(filters)
    .select(fields)
    .lean()
}

export const signUpUserGoogleAccount = async function (clerkUser, googleUserId) {
  await dbConnect()
  const _payload = mapClerkUserToSchema(clerkUser, googleUserId)
  const user = await User.create(_payload)
  return user
}

export const udpateUserById = async function (_id, _payload) {
  await User.findByIdAndUpdate(_id, {
    $set: _payload
  })
  return true;
}